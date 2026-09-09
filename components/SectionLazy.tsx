import React, { Suspense, useEffect, useRef, useState } from 'react';

interface SectionLazyProps {
  children: React.ReactNode;
  minHeight?: string;
}

const SectionLazy: React.FC<SectionLazyProps> = ({ children, minHeight = '200px' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ minHeight: visible ? undefined : minHeight }}>
      {visible ? <Suspense fallback={null}>{children}</Suspense> : null}
    </div>
  );
};

export default SectionLazy;
