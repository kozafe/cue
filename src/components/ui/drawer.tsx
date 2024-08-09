"use client";
import dynamic from "next/dynamic";
// import component 👇
import React from "react";
const DrawerModern = dynamic(() => import("react-modern-drawer"), {
  ssr: false,
});

//import styles 👇
import "react-modern-drawer/dist/index.css";

const Drawer: React.FC<React.ComponentProps<typeof DrawerModern>> = (props) => (
  <DrawerModern {...props} />
);

export default Drawer;
