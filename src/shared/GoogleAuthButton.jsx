import { useEffect, useRef, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

// The Google button only accepts a pixel width (180-400), so measure the
// container and pass that in; it then fills the form on phones and stops at 400 on wide cards.
const GoogleAuthButton = ({ text = "signin_with", onSuccess, onError }) => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setWidth(Math.floor(el.getBoundingClientRect().width));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full flex justify-center">
      {width > 0 && (
        <div className="rounded-full overflow-hidden shadow-sm ring-1 ring-gray-200 hover:ring-purple-300 hover:shadow-md transition">
          <GoogleLogin
            onSuccess={onSuccess}
            onError={onError}
            text={text}
            shape="pill"
            theme="outline"
            size="large"
            logo_alignment="center"
            width={Math.min(Math.max(width, 200), 400)}
          />
        </div>
      )}
    </div>
  );
};

export const AuthDivider = () => (
  <div className="flex items-center my-5 gap-3 text-xs uppercase tracking-widest text-gray-400">
    <span className="h-px flex-1 bg-gray-200" />
    <span>or continue with</span>
    <span className="h-px flex-1 bg-gray-200" />
  </div>
);

export default GoogleAuthButton;
