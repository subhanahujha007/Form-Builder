import React, { useTransition } from 'react';
import { Button } from './ui/button';
import { MdOutlinePublish } from 'react-icons/md';
import { 
  AlertDialog, 
  AlertDialogTrigger, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogFooter, 
  AlertDialogCancel, 
  AlertDialogAction ,
  AlertDialogTitle
} from './ui/alert-dialog';
import { AlertDescription } from './ui/alert';
import { toast } from '@/hooks/use-toast';
import { publishForm } from '@/actions/form';
import { useRouter } from 'next/navigation';

const PublishBtn = ({ id }: { id: number }) => {
  const [isPending, startTransition] = useTransition();
  const router=useRouter()
  async function PublishFormFunction() {
    try {
      await publishForm(id);
      toast({
        title: "Published Successfully",
        description: "Your form has been published successfully.",
      });
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-500"
        >
          Publish <MdOutlinePublish />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Are You Absolutely sure about this?</AlertDialogTitle>
        <AlertDialogHeader>
          <AlertDescription>
            This action cannot be undone. Once published, you will no longer be able to edit this form.
            <br />
            <br />
            After publishing, you will be able to share the form and collect information.
          </AlertDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={() => {
              startTransition(PublishFormFunction);
            }}
          >
            Proceed {isPending && <span className="animate-spin">⏳</span>}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PublishBtn;
