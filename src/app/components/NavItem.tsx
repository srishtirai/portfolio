type NavItemProps = {
  label: string;
  targetId: string;
};

const NavItem = ({ label, targetId }: NavItemProps) => {
  return (
    <div className="inline-block text-center">
      <a
        href={`#${targetId}`}
        className="text-primary text-small font-medium"
      >
        {label}
      </a>
      <div className="w-full bg-accent font-thin border border-accent"></div>
    </div>
  );
};

export default NavItem;
