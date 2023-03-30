import Image from "next/image";
import * as React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Navbar, Button, Link, Text, Card, Radio } from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.js";
import { Avatar } from "@nextui-org/react";
import { useState } from "react";

export default function index() {
  const { data: session } = useSession();

  const [variant, setVariant] = React.useState("static");
  const variants = ["static", "floating", "sticky"];

  const [btnText, setBtnText] = useState("Sign In");
  const [signOutBtnText, setSignOutBtnText] = useState("Sign Out");

  return (
    <>
      <Navbar isBordered variant="floating">
        <Navbar.Brand>
          <AcmeLogo />
          {/* <Text b color="inherit" hideIn="xs">
            ACME
          </Text> */}
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
          {/* <Navbar.Link href="#">Features</Navbar.Link>
          <Navbar.Link isActive href="#">Customers</Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Company</Navbar.Link> */}
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Item>
            {session ? (
              <>
                
                <Button
                  color="primary"
                  onClick={() => signOut()}
                  className="bg-blue-500 hover:bg-blue-700 text-white"
                  auto
                >
                  {signOutBtnText}
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="primary"
                  onClick={() => signIn()}
                  className="bg-blue-500 hover:bg-blue-700 text-white"
                  auto
                >
                  {btnText}
                </Button>
              </>
            )}
          </Navbar.Item>
          <Avatar
            src={
              session?.user?.image ||
              "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"
            }
            squared
            zoomed
            style={{ width: 40, height: 40 }}
          />
        </Navbar.Content>
      </Navbar>
    </>
  );
}
