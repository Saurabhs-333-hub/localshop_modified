'use client'
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, useDisclosure, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";
import { useUser } from "@/app/context/user";
import { GoogleLogin } from "@react-oauth/google";
import LoginButton from "./Login";
// import { AcmeLogo } from "./AcmeLogo.jsx";

export function MainNavbar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];
    const authStatus = useUser().user
    const user = useUser()

    const handleLogout = async () => {
        await user.logout()
    }
    const { onOpen, onClose, isOpen, onOpenChange } = useDisclosure()
    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen}>
            <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                className="sm:hidden"
            />
            <NavbarBrand>
                {/* <AcmeLogo /> */}
                <p className="font-bold text-inherit">LOCALSHOP</p>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <Dropdown>
                    <NavbarItem>
                        <DropdownTrigger className="cursor-pointer">
                            {/* <Button
                                disableRipple
                                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                                // endContent={icons.chevron}
                                radius="sm"
                                variant="light"
                            > */}
                            Men
                            {/* </Button> */}
                        </DropdownTrigger>
                    </NavbarItem>
                    <DropdownMenu
                        aria-label="ACME features"
                        className="w-[340px]"
                        itemClasses={{
                            base: "gap-4",
                        }}
                    >
                        <DropdownItem
                            key="autoscaling"
                            description="ACME scales apps to meet user demand, automagically, based on load."
                        // startContent={icons.scale}
                        >
                            Autoscaling
                        </DropdownItem>
                        <DropdownItem
                            key="usage_metrics"
                            description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
                        // startContent={icons.activity}
                        >
                            Usage Metrics
                        </DropdownItem>
                        <DropdownItem
                            key="production_ready"
                            description="ACME runs on ACME, join us and others serving requests at web scale."
                        // startContent={icons.flash}
                        >
                            Production Ready
                        </DropdownItem>
                        <DropdownItem
                            key="99_uptime"
                            description="Applications stay on the grid with high availability and high uptime guarantees."
                        // startContent={icons.server}
                        >
                            +99% Uptime
                        </DropdownItem>
                        <DropdownItem
                            key="supreme_support"
                            description="Overcome any challenge with a supporting team ready to respond."
                        // startContent={icons.user}
                        >
                            +Supreme Support
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <NavbarItem isActive>
                    <Button disableRipple
                        className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                        // endContent={icons.chevron}
                        radius="sm"
                        variant="light">
                        Women
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button disableRipple
                        className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                        // endContent={icons.chevron}
                        radius="sm"
                        variant="light">
                        Sale
                    </Button>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>


                <NavbarMenuItem isActive>
                    {/* <Button fullWidth> */}
                    Women
                    {/* </Button> */}
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Button color="default" fullWidth >
                        Sale
                    </Button>
                </NavbarMenuItem>


            </NavbarMenu>
            {authStatus == null ? <NavbarContent justify="end"> <NavbarItem>
                <LoginButton />
            </NavbarItem>
            </NavbarContent> : authStatus == null ? <NavbarContent justify="end"> <NavbarItem>
                <Avatar >
                    Loading...
                </Avatar>
            </NavbarItem>
            </NavbarContent>
                : <NavbarContent as="div" justify="end">
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform"
                                color="secondary"
                                name="Jason Hughes"
                                size="sm"
                                src={authStatus!.profileImage}
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Signed in as</p>
                                <div className="flex">
                                    <p className="font-semibold text-purple-500">{authStatus!.username}</p>
                                    <p className="font-semibold text-purple-500 m-auto uppercase">{authStatus!.email}</p>

                                </div>
                            </DropdownItem>
                            {true ? <DropdownItem key="dashboard" className='text-success' color='success' onClick={() => {
                                // router.push('/dashboard')
                            }}>Dash Board</DropdownItem> : <DropdownItem key="selleraccount" className='text-success' color='success' onClick={onOpen}>Become a Seller! 💰</DropdownItem>}
                            <DropdownItem key="settings" showDivider>Settings</DropdownItem>
                            <DropdownItem key="system">System</DropdownItem>
                            <DropdownItem key="configurations">Configurations</DropdownItem>
                            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                            <DropdownItem description="This will logout you!" className='text-danger' color='danger' onClick={handleLogout}>Logout</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>}
        </Navbar>
    );
}
