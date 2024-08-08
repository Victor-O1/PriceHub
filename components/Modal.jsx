"use client"

import React, { Fragment, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import Image from 'next/image'
import { addUserEmailToProduct } from '@/lib/actions'
// import { Dialog, Transition, TransitionChild } from '@headlessui/react'

const Modal = ({ productId }) => {
    // let [isOpen, setIsOpen] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [email, setemail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        await addUserEmailToProduct(productId, email);

        setIsSubmitting(false)
        setemail('')
        setIsOpen(false)
    }


    return (
        <>


            {/* <Transition appear show={isOpen} as={Fragment}>
                <Dialog as={"div"} open={isOpen} onClose={() => setIsOpen(false)} onOpen={() => setIsOpen(true)} className="relative z-50 dialog-container">
                    <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    </div>
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100'>
                            <Dialog.Overlay className="fixed inset-0" />

                        </Transition.Child>
                        <span className="inline-block h-screen align-middle" aria-hidden="true" />
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom='opacity-0 scale-95' enterTo='opacity-100 scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 scale-100' leaveTo='opacity-0 scale-95'>
                            <div className="dialog-content">
                                <div className="flex flex-co">
                                    <div className="flex justify-between">
                                        <div className="p-3 border border-gray-200 rounded-10">
                                            <Image src="/assets/icons/logo.svg" alt="logo" width={20} height={20} />

                                        </div>
                                    </div>
                                    <Image src="/assets/icons/x-close.svg" alt="close" width={24} height={24} className="cursor-pointer" onClick={() => { setIsOpen(false) }} />

                                </div>
                                <h4>
                                    Stay updated with product pricing alerts right in your inbox
                                </h4>
                                <p>
                                    Never miss a bargain again with our timely alerts.
                                </p>

                            </div>
                            <form className='flex flex-col mt-5'>
                                <label htmlFor='email' className="text-sm font-medium text-gray-700">Email address</label>

                            </form>
                        </Transition.Child>

                    </div>
                </Dialog>
            </Transition> */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger className="btn" onClick={() => setIsOpen((prev) => { return !prev })} >{isOpen ? "open" : "not"} {isSubmitting ? 'Tracking...' : 'Track'}</DialogTrigger>
                {isOpen ?
                    <DialogContent className="dialog-content">
                        {/* <DialogHeader> */}

                        <DialogTitle className="invisible hidden">This allows you to track</DialogTitle>

                        <div className="flex flex-col gap-3 mt-4 p-3">
                            <div className="flex flex-col ">
                                <div className="text-lg font-bold text-black">Stay updated with product pricing alerts right in your inbox!</div>
                                <div className="text-sm  text-black">Never miss a bargain again with our timely alerts.</div>
                            </div>

                            <form className="flex flex-col flex-wrap" onSubmit={handleSubmit}>
                                <label htmlFor="email" className="text-sm font-medium text-gray-700 ">Email Address</label>
                                <div className="dialog-input_container">
                                    <Image src="/assets/icons/mail.svg" alt="mail" width={18} height={18} />
                                    <input required type="email" className="dialog-input px-2" placeholder='contact@pricehub.com' value={email} onChange={(e) => setemail(e.target.value)} />
                                </div>
                                <button className="dialog-btn mt-1" type='submit'>{isSubmitting ? 'Tracking...' : 'Track Product'}</button>
                            </form>

                        </div>






                        {/* </DialogTitle> */}
                        {/* <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                            </DialogDescription> */}
                        {/* </DialogHeader> */}
                    </DialogContent>
                    : null}
            </Dialog >
        </>
    )
}

export default Modal



