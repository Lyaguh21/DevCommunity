import { NavLink, useLocation } from "react-router";
import { Text, Box, Flex } from "@mantine/core";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Navigation() {
  const location = useLocation();
  const links = [
    { to: "/", label: "Лента" },
    { to: "/profile", label: "Профиль" },
    { to: "/portfolio", label: "Портфолио" },
  ];

  const refs = useRef<(HTMLAnchorElement | null)[]>([]);

  const underlineX = useMotionValue(0);
  const underlineWidth = useMotionValue(0);

  useEffect(() => {
    const activeIndex = links.findIndex(
      (link) => location.pathname === link.to
    );
    const activeRef = refs.current[activeIndex];

    if (activeRef) {
      const { offsetLeft, offsetWidth } = activeRef;

      animate(underlineX, offsetLeft, {
        duration: 0.3,
        ease: "easeOut",
      });

      animate(underlineWidth, offsetWidth, {
        duration: 0.3,
        ease: "easeOut",
      });
    }
  }, [location.pathname]);

  return (
    <Flex
      style={{
        position: "absolute",
        left: "50%",
        gap: "40px",
        paddingBottom: "4px",
        transform: "translateX(-50%)",
      }}
    >
      {links.map((link, index) => (
        <NavLink
          key={link.to}
          ref={(el) => (refs.current[index] = el)}
          to={link.to}
          style={{
            textDecoration: "none",
            position: "relative",
            zIndex: 2,
          }}
        >
          <Text
            fw={500}
            c={location.pathname === link.to ? "#4f46e5" : "#374151"}
          >
            {link.label}
          </Text>
        </NavLink>
      ))}

      <motion.div
        style={{
          position: "absolute",
          bottom: 0,
          left: underlineX,
          height: 2,
          backgroundColor: "#4f46e5",
          width: underlineWidth,
          zIndex: 1,
        }}
      />
    </Flex>
  );
}
