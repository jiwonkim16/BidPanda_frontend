import Footer from "./Footer";

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
  return (
    <div className="bg-gray-300 w-screen h-screen fixed flex justify-center">
      <div className="bg-white w-[390px] h-[844px] rounded-[37px] mt-[50px]">
        {children}
        <footer className="w-[390px] rounded-b-[37px] rounded-t-none bg-white text-gray-700 3 text-center">
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default MobileLayout;
