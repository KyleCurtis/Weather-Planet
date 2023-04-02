import { useState, useRef } from "react";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  Button,
} from "@chakra-ui/react";
import ThemeToggler from "./ThemeToggle";

import { IoMdMenu, IoMdPlanet } from "react-icons/io";

interface NavLinkProps {
  text: string;
  href: string;
}

const NavLink: React.FC<NavLinkProps> = ({ text, href }) => (
  <a
    href={href}
    className="nav-link text-white no-underline ml-4 transition-colors duration-200 ease-in-out hidden md:flex hover:text-gray-300"
  >
    {text}
  </a>
);

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <nav className="navbar bg-[#111111] fixed w-screen flex items-center">
        <div className="flex items-center w-[200px] text-[#ffffff] font-bold">
          <IoMdPlanet className="text-[30px] mr-2" /> Weather-Planet
        </div>
        <div
          className={`flex justify-end w-full items-center ${
            menuOpen ? "open" : ""
          } `}
        >
          <NavLink text="Github" href="/" />
          <NavLink text="Support the site" href="/" />
          <ThemeToggler />
          <button
            className={`w-[30px] h-[30px] bg-blue-100 rounded-lg dark:bg-slate-800 ${
              menuOpen ? "open" : ""
            } ml-4 `}
            ref={btnRef}
            onClick={onOpen}
          >
            <IoMdMenu className="w-[20px] h-[20px] m-auto" />
          </button>
        </div>
      </nav>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Input placeholder="Type here..." />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
