import { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const WIDGET_WIDTH = 304;
const WIDGET_HEIGHT = 78;

// reCAPTCHA v2 checkbox. Renders nothing when no site key is configured,
// so local development works without one (the backend skips the check too).
// Pass a ref to call `ref.current.reset()` after each submit; tokens are single-use.
// The widget is a fixed 304px wide, so it is scaled down to fit narrow containers.
const Recaptcha = ({ onChange, ref }) => {
  const boxRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.getBoundingClientRect().width / WIDGET_WIDTH));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  if (!RECAPTCHA_SITE_KEY) return null;
  return (
    <div ref={boxRef} className="w-full flex justify-center overflow-hidden" style={{ height: WIDGET_HEIGHT * scale }}>
      <div style={{ width: WIDGET_WIDTH, transform: `scale(${scale})`, transformOrigin: "top center" }}
        className="shrink-0 rounded-md shadow-sm">
        <ReCAPTCHA ref={ref} sitekey={RECAPTCHA_SITE_KEY} onChange={onChange} onExpired={() => onChange(null)} />
      </div>
    </div>
  );
};

export default Recaptcha;
