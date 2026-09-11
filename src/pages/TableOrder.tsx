import { useParams } from 'react-router-dom';
import { Menu } from './Menu';

export function TableOrder() {
  const { tableId } = useParams<{ tableId: string }>();

  return (
    <div className="w-full h-full flex flex-col relative">
      <div className="bg-[#D6A45D]/10 border-b border-[#D6A45D]/20 px-8 py-4 text-center">
        <p className="text-[#D6A45D] text-sm font-semibold tracking-widest uppercase">
          You're ordering from Table {tableId}
        </p>
      </div>
      <div className="flex-grow">
        <Menu />
      </div>
    </div>
  );
}
