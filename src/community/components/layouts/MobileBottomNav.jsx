import { Home, BookOpen, Users, MessageCircle, UserPlus, User } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { key: "feed", label: "Feed", icon: Home, to: "/dashboard/feed" },
  { key: "bible", label: "Bible", icon: BookOpen, to: "/dashboard/bible" },
  { key: "groups", label: "Groups", icon: Users, to: "/dashboard/groups" },
  { key: "people", label: "People", icon: UserPlus, to: "/dashboard/people" },
  { key: "messages", label: "Messages", icon: MessageCircle, to: "/dashboard/messages" },
  { key: "profile", label: "Profile", icon: User, to: "/dashboard/profile" },
];

const MobileBottomNav = () => (
  <>
    <div className="ob-nav-shelf lg:hidden" />
    <nav
      className="lg:hidden fixed left-4 right-4 z-50 mx-auto max-w-[480px]"
      style={{ bottom: "max(env(safe-area-inset-bottom), 16px)" }}
    >
      <div className="ob-glass-strong ob-nav rounded-full flex items-center h-16 px-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.key}
              to={item.to}
              className="ob-nav-item flex-1 min-w-0 h-14 flex flex-col items-center justify-center gap-0.5"
            >
              <Icon size={21} />
              <span className="text-[10px] font-medium leading-none">{item.label}</span>
              <span className="ob-nav-dot" />
            </NavLink>
          );
        })}
      </div>
    </nav>
  </>
);

export default MobileBottomNav;
