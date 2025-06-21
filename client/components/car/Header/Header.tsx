import { MdArrowBack, MdFavorite, MdPrint, MdShare } from "react-icons/md";

const Header = ({ handleShare, router }: any) => {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
          >
            <MdArrowBack className="text-xl" />
            <span>Retour</span>
          </button>
          <div className="flex gap-2">
            <button
              onClick={handleShare}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <MdShare className="text-xl text-gray-600" />
            </button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <MdFavorite className="text-xl text-gray-600" />
            </button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <MdPrint className="text-xl text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
