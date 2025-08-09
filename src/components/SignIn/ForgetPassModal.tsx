import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';
import { resetPassword } from '../AuthFolder/AuthFiles';
import { toast } from 'react-hot-toast';
import emailjs from "@emailjs/browser";

interface ForgotProps {
    onClose: () => void;
}

const ForgotPassModal: React.FC<ForgotProps> = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleReset = async () => {
        if (!email) {
            toast.error('Email is required');
            return;
        }

        setLoading(true);
        try {
            console.log("1. Sending resetPassword request...");
            const response = await resetPassword(email);
            console.log("2. Got response:", response);

            if (!response || !response.data || !response.data.link) {
                console.log("3. Response missing link");
                toast.error("Unable to generate reset link");
                setLoading(false);
                return;
            }

            console.log("4. Sending EmailJS...");
            await emailjs.send(
                "service_8qzr5ib",
                "contact_form",
                {
                    to_email: email,
                    reset_link: response.data.link,
                },
                "x8QfCUeOjxLraFUOM"
            );
            console.log("5. Email sent");

            toast.success("Check your email for the reset link");
            onClose();

        } catch (err) {
            console.error("Error in handleReset:", err);
            toast.error('Failed to send reset link');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open onOpenChange={(val) => { if (!val) onClose(); }}>
            <DialogContent className="sm:max-w-md bg-[#fef5e5]">
                {loading && <LoadingAnimation />}
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-[#D4AF37]">Reset Password</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-2">
                    <p className="text-sm text-gray-600">
                        Enter your email address and we’ll send you a link to reset your password.
                    </p>
                    <Input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white"
                    />
                </div>

                <DialogFooter className="mt-4">
                    <Button disabled={loading} onClick={handleReset} className="bg-[#D4AF37] text-black">
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ForgotPassModal;
