import { useEffect, useRef } from 'react';
import { User as UserIcon, LogOut, Wallet } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { formatWalletAddress } from '../utils/auth';

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileDropdown({ isOpen, onClose }: ProfileDropdownProps) {
  const { user, signOut } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !user) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl border-4 border-gray-900 shadow-lg z-50 overflow-hidden"
    >
      <div className="p-4 bg-cream-100 border-b-3 border-gray-900">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-sunshine-400 border-3 border-gray-900 flex items-center justify-center flex-shrink-0">
            {user.authType === 'wallet' ? (
              <Wallet className="w-6 h-6 text-gray-900" />
            ) : (
              <UserIcon className="w-6 h-6 text-gray-900" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            {user.authType === 'email' ? (
              <>
                <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-700 font-semibold truncate">{user.email}</p>
              </>
            ) : (
              <>
                <p className="text-sm font-bold text-gray-900">Wallet Connected</p>
                <p className="text-xs text-gray-700 font-semibold font-mono">
                  {formatWalletAddress(user.walletAddress || '')}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="p-2">
        <button
          onClick={() => {
            signOut();
            onClose();
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-cream-100 transition-colors text-left group"
        >
          <LogOut className="w-5 h-5 text-gray-700 group-hover:text-gray-900" />
          <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900">
            {user.authType === 'wallet' ? 'Disconnect Wallet' : 'Sign Out'}
          </span>
        </button>
      </div>
    </div>
  );
}
