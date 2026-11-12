import { NextRequest, NextResponse } from "next/server";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function resolveTelegramEndpoint(): string | null {
  const customUrl = process.env.TELEGRAM_API_URL?.trim();
  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();

  if (customUrl && customUrl !== "https://api.telegram.org/bot") {
    return customUrl.endsWith("/sendMessage")
      ? customUrl
      : `${customUrl.replace(/\/+$/, "")}/sendMessage`;
  }
  if (botToken) {
    return `https://api.telegram.org/bot${botToken}/sendMessage`;
  }
  return null;
}

export async function GET() {
  const web3formsKey = (
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
    process.env.WEB3FORMS_ACCESS_KEY ||
    ""
  ).trim();

  return NextResponse.json(
    { web3formsKey },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const subject =
      typeof body.subject === "string" && body.subject.trim()
        ? body.subject.trim()
        : "Portfolio Inquiry";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const botcheck = Boolean(body.botcheck);
    const skipWeb3Forms = Boolean(body.skipWeb3Forms);

    // Silently accept honeypot submissions so spam bots do not retry
    if (botcheck) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const web3Key = skipWeb3Forms
      ? ""
      : (
          process.env.WEB3FORMS_ACCESS_KEY ||
          process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
          ""
        ).trim();
    const telegramEndpoint = resolveTelegramEndpoint();
    const telegramChatId = process.env.TELEGRAM_CHAT_ID?.trim() || "";
    const telegramEnabled = Boolean(telegramEndpoint && telegramChatId);

    if (!web3Key && !telegramEnabled) {
      if (skipWeb3Forms) {
        return NextResponse.json({ success: true });
      }
      return NextResponse.json(
        {
          success: false,
          message:
            "Contact delivery is not configured yet. Add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY or Telegram credentials in .env.local.",
        },
        { status: 500 }
      );
    }

    const tasks: Array<Promise<{ channel: string; ok: boolean; error?: string }>> = [];

    if (web3Key) {
      const fd = new FormData();
      fd.append("access_key", web3Key);
      fd.append("name", name);
      fd.append("email", email);
      fd.append("replyto", email);
      fd.append("subject", `[From Arin's Portfolio] ${subject} — ${name}`);
      fd.append("from_name", "Arin's Portfolio");
      fd.append("message", message);

      tasks.push(
        fetch(WEB3FORMS_ENDPOINT, {
          method: "POST",
          body: fd,
        })
          .then(async (res) => {
            const data = await res.json().catch(() => ({}));
            return res.ok && data.success
              ? { channel: "web3forms", ok: true }
              : {
                  channel: "web3forms",
                  ok: false,
                  error: data.message || "Web3Forms rejected the request",
                };
          })
          .catch((err: Error) => ({
            channel: "web3forms",
            ok: false,
            error: err.message,
          }))
      );
    }

    if (telegramEnabled && telegramEndpoint) {
      const istTime = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short",
      });

      const telegramText = [
        `<b>📩 New Inquiry — From Arin's Portfolio</b>`,
        ``,
        `<b>👤 Name:</b> ${escapeHtml(name)}`,
        `<b>📧 Email:</b> ${escapeHtml(email)}`,
        `<b>🏷️ Topic:</b> ${escapeHtml(subject)}`,
        ``,
        `<b>💬 Message:</b>`,
        escapeHtml(message),
        ``,
        `<i>🕒 ${escapeHtml(istTime)} IST</i>`,
      ].join("\n");

      tasks.push(
        fetch(telegramEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: telegramText,
            parse_mode: "HTML",
            disable_web_page_preview: true,
          }),
        })
          .then(async (res) => {
            const data = await res.json().catch(() => ({}));
            return res.ok && data.ok
              ? { channel: "telegram", ok: true }
              : {
                  channel: "telegram",
                  ok: false,
                  error: data.description || "Telegram API error",
                };
          })
          .catch((err: Error) => ({
            channel: "telegram",
            ok: false,
            error: err.message,
          }))
      );
    }

    const results = await Promise.all(tasks);
    const anySucceeded = results.some((r) => r.ok);
    const failed = results.filter((r) => !r.ok);

    if (!anySucceeded) {
      const firstError = failed[0]?.error || "Failed to deliver message.";
      return NextResponse.json(
        { success: false, message: firstError, results },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      results,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request payload." },
      { status: 400 }
    );
  }
}
