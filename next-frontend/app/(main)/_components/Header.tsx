// components/MainHeader.tsx
import { useUniversity } from "@/context/university-context";
import { WalletCards, ChevronRight, ArrowLeft } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuthContext } from "@/context/auth-provider";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { isLoading, user } = useAuthContext();
  const { selectedUniversity, setSelectedUniversity } = useUniversity();
  const router = useRouter();

  // Get styles based on vertical
  const getHeaderStyles = () => {
    if (!selectedUniversity) return "";
    const styles = {
      ONLINE: "border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-950/50",
      REGULAR: "border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/50",
      DISTANCE: "border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/50"
    };
    return styles[selectedUniversity.vertical];
  };

  const handleBackToDashboard = () => {
    setSelectedUniversity(null);
    router.push('/home');
  };

  return (
    <div className="w-full">
      <div className={`flex h-[60px] items-center justify-between border-b px-2 ${getHeaderStyles() || 'border-[#00002f26]'}`}>
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="-ml-1" />
          
          {selectedUniversity && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToDashboard}
                className="flex items-center text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Dashboard
              </Button>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <ChevronRight className="h-4 w-4" />
                <span className="ml-1">{selectedUniversity.universityName}</span>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {/* Wallet balance */}
          <div className="flex flex-row items-center space-x-2 rounded-lg bg-primary/5 px-3 py-1.5">
            <WalletCards className="h-4 w-4 text-primary" />
            <div className="text-sm font-medium">
              ₹{user?.wallet?.balance?.toLocaleString() || 0}
            </div>
          </div>

          {/* Vertical badge when university is selected */}
          {selectedUniversity && (
            <div className={`hidden md:flex items-center rounded-full px-3 py-1 text-sm font-medium ${
              selectedUniversity.vertical === 'ONLINE' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' :
              selectedUniversity.vertical === 'REGULAR' ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' :
              'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400'
            }`}>
              {selectedUniversity.vertical} Mode
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;