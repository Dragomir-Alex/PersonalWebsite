import AnimatedButton from "./AnimatedButton";

const Navbar = () => {
  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const zigzag = {
    "--m": `
      conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) bottom/40px 20px repeat-x,
      linear-gradient(#000 0 0) top/100% calc(100% - 20px) no-repeat
    `,
    WebkitMask: "var(--m)",
    mask: "var(--m)",
  };

  const handleNavClick = (href) => {};

  return (
    <nav
      className="fixed pb-6 pt-1 top-0 left-0 right-0 z-50 bg-amber-300"
      style={zigzag}
    >
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
