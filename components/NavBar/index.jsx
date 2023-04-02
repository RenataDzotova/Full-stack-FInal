import Image from "next/image";
import * as React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Navbar, Button, Link, Text, Card, Radio } from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.js";
import { Avatar } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function index() {

  const router = useRouter();
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
          {/* <Navbar.Link isActive href="#">Customers</Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Company</Navbar.Link> */}
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Item>
            {session ? (
              <>
                <Button 
                  color="#d9d9d9"
                  onClick={()=> router.push('/addPost')}
                  className="bg-blue-500 hover:bg-blue-700 text-white"
                  auto
                  style={{marginRight:'15px', color:'#0072f5'}}
                  >Post A New Review
                  </Button> 
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
