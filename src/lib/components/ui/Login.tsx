'use client'
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link, Card, CardBody } from "@nextui-org/react";
import { useUser } from "@/app/context/user";
// import { MailIcon } from './MailIcon.jsx';
// import { LockIcon } from './LockIcon.jsx';

export default function LoginButton() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    // const [name, setName] = useState('')
    const [isCreateAccount, setIsCreateAccount] = useState(false)
    const [formData, setformData] = React.useState({
        username: '',
        email: '',
        password: '',
    })
    const validateEmail = (value: any) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const isInvalid = React.useMemo(() => {
        let value = formData.email;
        if (value === "") return false;

        return validateEmail(value) ? false : true;
    }, [formData.email]);
    const user = useUser()
    const handleSignUp = async () => {
        await user.useRegister(formData.email, formData.password, formData.username)
    }
    const handleLogout = async () => {
        await user.logout()
    }
    const handleSignIn = async () => {
        try {

            await user.uselogin(formData.email, formData.password)
        } catch (error) {
            console.log('Login Failed:', user.error)
        }
    }
    return (
        <>
            <Button onPress={onOpen} color="primary" variant="flat">Log in</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement={"auto"}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{isCreateAccount === false ? 'Log in' : 'Create Account'}</ModalHeader>
                            {/* <form onSubmit={isCreateAccount ? handleSignIn : handleSignUp}> */}

                            <ModalBody>
                                {isCreateAccount ? <Input type="text" label="Username" value={formData.username} isRequired onClear={
                                    () => {
                                        setformData({ ...formData, username: '' })
                                    }
                                } isClearable onChange={(e) => {
                                    setformData({ ...formData, username: e.target.value })
                                }} className="rounded-lg m-auto text-cyan-500 w-full outline-none active:bg-transparent hover:text-cyan-300 transition-all" /> : <></>}
                                <Input type="email" label="Email" value={formData.email}
                                    isInvalid={isInvalid}
                                    color={isInvalid ? "danger" : "default"}
                                    errorMessage={isInvalid && "Please enter a valid email"} isRequired onClear={() => {
                                        setformData({ ...formData, email: '' })
                                    }} isClearable onChange={(e) => {
                                        setformData({ ...formData, email: e.target.value })
                                    }} className="rounded-lg m-auto text-cyan-500 w-full outline-none active:bg-transparent hover:text-cyan-300 transition-all" />
                                <Input type="password" label="Password" value={formData.password} isRequired onClear={
                                    () => {
                                        setformData({ ...formData, password: '' })
                                    }
                                } isClearable onChange={(e) => {
                                    setformData({ ...formData, password: e.target.value })
                                }} className="rounded-lg m-auto text-cyan-500 w-full outline-none active:bg-transparent hover:text-cyan-300 transition-all" />
                                <div className="flex py-2 px-1 justify-end">
                                    {/* <Checkbox
                                        classNames={{
                                            label: "text-small",
                                        }}
                                    >
                                        Remember me
                                    </Checkbox> */}
                                    {isCreateAccount === false ? <Link color="primary" href="#" size="sm">
                                        Forgot password?
                                    </Link> : <></>}
                                </div>
                                {isCreateAccount === false ? <Button
                                    variant="flat"
                                    color="primary"
                                    type="submit"
                                    onClick={handleSignIn}
                                    size="lg"
                                >
                                    Log in

                                </Button> : <Button
                                    variant="flat"
                                    color="primary"
                                    type="submit"
                                    onClick={handleSignUp}
                                    size="lg"
                                >
                                    Register

                                </Button>}
                            </ModalBody>
                            {/* </form> */}

                            <ModalFooter>
                                {isCreateAccount === false ? <> <p className="text-sm"> Don't have an Account?  </p>  <Link color="primary" className={'cursor-pointer'} onClick={() => {
                                    setIsCreateAccount(!isCreateAccount)

                                }} size="sm">
                                    Create Account
                                </Link>
                                </> : <> <p className="text-sm"> Already have an Account?  </p><Link color="primary" className={'cursor-pointer'} onClick={() => {
                                    setIsCreateAccount(!isCreateAccount)
                                }} size="sm">
                                    Login
                                </Link> </>
                                }
                            </ModalFooter>
                            {user.error && <Card className="m-2">
                                <CardBody>
                                    <p>{user.error}</p> <Button onPress={
                                        onClose
                                    }>Close</Button>
                                </CardBody>
                            </Card>}
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
