import { Loader2Icon } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center primary">
      <Loader2Icon className="h-8 w-8 animate-spin" />
    </div>
  );
};

export default Loading;
