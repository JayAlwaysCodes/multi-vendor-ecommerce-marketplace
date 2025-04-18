import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import HeadingSmall from '@/components/heading-small';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function DeleteUser() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm<Required<{ password: string }>>({ password: '' });

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        clearErrors();
        reset();
    };

    return (
        <div className="space-y-6">
            <HeadingSmall title="Delete account" description="Delete your account and all of its resources" />
            <div className="space-y-4 rounded-lg border border-[#FF4433]/30 bg-[#FF4433]/10 p-4">
                <div className="relative space-y-0.5 text-[#FF4433] font-['Inter']">
                    <p className="font-medium">Warning</p>
                    <p className="text-sm">Please proceed with caution, this cannot be undone.</p>
                </div>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="destructive" className="bg-[#FF4433] text-[#E5E7EB] hover:bg-[#FF4433]/80">
                            Delete account
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#2A2A40] text-[#E5E7EB] border-[#00D4FF] shadow-[0_0_5px_#00D4FF]">
                        <DialogTitle className="font-['Orbitron'] text-[#FFD700]">Are you sure you want to delete your account?</DialogTitle>
                        <DialogDescription className="text-[#A1A09A]">
                            Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password
                            to confirm you would like to permanently delete your account.
                        </DialogDescription>
                        <form className="space-y-6" onSubmit={deleteUser}>
                            <div className="grid gap-2">
                                <Label htmlFor="password" className="sr-only">
                                    Password
                                </Label>

                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    className="bg-[#1A1A2E] text-[#E5E7EB] border-[#00D4FF] focus:ring-[#00D4FF] placeholder-[#A1A09A]"
                                />

                                <InputError message={errors.password} className="text-[#FF4433]" />
                            </div>

                            <DialogFooter className="gap-2">
                                <DialogClose asChild>
                                    <Button
                                        variant="secondary"
                                        onClick={closeModal}
                                        className="bg-[#A1A09A]/20 text-[#E5E7EB] hover:bg-[#A1A09A]/40"
                                    >
                                        Cancel
                                    </Button>
                                </DialogClose>

                                <Button
                                    variant="destructive"
                                    disabled={processing}
                                    className="bg-[#FF4433] text-[#E5E7EB] hover:bg-[#FF4433]/80"
                                    asChild
                                >
                                    <button type="submit">Delete account</button>
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}