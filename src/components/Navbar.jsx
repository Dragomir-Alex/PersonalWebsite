import AnimatedButton from "./AnimatedButton";

const Navbar = () => {
  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href) => {};

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-[0px_5px_rgba(0,_98,_90,_0.4),_0px_10px_rgba(0,_98,_90,_0.3),_0px_15px_rgba(0,_98,_90,_0.2),_0px_20px_rgba(0,_98,_90,_0.1),_0px_25px_rgba(0,_98,_90,_0.05)]">
      <div className="flex items-center gap-20 px-10">
        {navItems.map((item) => (
          <AnimatedButton
            key={item.label}
            onClick={() => handleNavClick(item.href)}
            className="px-4 py-4 font-daydream"
          >
            {item.label}
          </AnimatedButton>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
