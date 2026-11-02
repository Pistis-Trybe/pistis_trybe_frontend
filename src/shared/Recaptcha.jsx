import ReCAPTCHA from "react-google-recaptcha";

export const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

// reCAPTCHA v2 checkbox. Renders nothing when no site key is configured,
// so local development works without one (the backend skips the check too).
// Pass a ref to call `ref.current.reset()` after each submit; tokens are single-use.
const Recaptcha = ({ onChange, ref }) => {
  if (!RECAPTCHA_SITE_KEY) return null;
  return (
    <div className="flex justify-center">
      <ReCAPTCHA ref={ref} sitekey={RECAPTCHA_SITE_KEY} onChange={onChange} onExpired={() => onChange(null)} />
    </div>
  );
};

export default Recaptcha;
