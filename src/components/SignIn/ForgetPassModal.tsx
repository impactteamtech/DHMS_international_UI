import React, { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Input } from '../ui/input'; // assuming you have this from shadcn
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';
import { resetPassword } from '../AuthFolder/AuthFiles';
import { toast } from 'react-hot-toast';

const ForgotPassModal: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleReset = async () => {
    if (!email) {
      toast.error('Email is required');
      return;
    }

    setLoading(true);
    try {
      const response = await resetPassword(email);
      toast.success('Check your email for the reset link');
      setOpen(false);
    } catch (err) {
      toast.error('Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="hover:underline text-sm text-gray-400">Forgot password?</button>
      </DialogTrigger>

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
            Send Reset Link
          </Button>
        </DialogFooter>

        {/* Optional Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-white bg-black/40 hover:bg-black/70 p-1 rounded-full"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPassModal;
