import React, { useState } from 'react';
import {
  Menu,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  XCircle,
  Link as LinkIcon,
} from 'lucide-react';
import { NavItem } from '../../../types';
import { ConfirmModal } from '../../../components/common/ConfirmModal';

interface NavItemsManagerProps {
  navItems: NavItem[];
  onOpenCreate: () => void;
  onOpenEdit: (item: NavItem) => void;
  onDelete: (id: number) => void;
  onToggleActive: (item: NavItem) => void;
  onMoveOrder: (item: NavItem, direction: 'up' | 'down') => void;
}

export const NavItemsManager: React.FC<NavItemsManagerProps> = ({
  navItems,
  onOpenCreate,
  onOpenEdit,
  onDelete,
  onToggleActive,
  onMoveOrder,
}) => {
  const [itemToDelete, setItemToDelete] = useState<NavItem | null>(null);

  const sortedItems = [...navItems].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Menu className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-bold text-slate-900">Navigation Menu Items CMS</h3>
          </div>
          <p className="text-xs text-slate-500">
            Control the links, sequence, and external targets that appear in the Desktop Navigation Bar and Fullscreen Mobile Drawer.
          </p>
        </div>
        <button
          onClick={onOpenCreate}
          className="py-2 px-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 text-slate-950" />
          <span>Add Menu Item</span>
        </button>
      </div>

      {/* Table of Navigation Items */}
      <div className="rounded-2xl bg-white border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4 w-20 text-center">Order</th>
                <th className="py-3 px-4">Menu Label</th>
                <th className="py-3 px-4">Target Path</th>
                <th className="py-3 px-4 text-center">Link Type</th>
                <th className="py-3 px-4 text-center">Visibility</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {sortedItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No navigation items found. Click "Add Menu Item" above to add one.
                  </td>
                </tr>
              ) : (
                sortedItems.map((item, index) => {
                  const isFirst = index === 0;
                  const isLast = index === sortedItems.length - 1;

                  return (
                    <tr
                      key={item.id || item.label}
                      className="hover:bg-slate-50/60 transition-colors group"
                    >
                      {/* Order Controls */}
                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => onMoveOrder(item, 'up')}
                            disabled={isFirst}
                            className="p-1 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-800 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-bold text-slate-700 min-w-[18px]">
                            {item.displayOrder || index + 1}
                          </span>
                          <button
                            onClick={() => onMoveOrder(item, 'down')}
                            disabled={isLast}
                            className="p-1 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-800 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      {/* Menu Label */}
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-900 text-sm">
                          {item.label}
                        </span>
                      </td>

                      {/* Target Path */}
                      <td className="py-3 px-4">
                        <span className="font-mono text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                          {item.path}
                        </span>
                      </td>

                      {/* Link Type Badge */}
                      <td className="py-3 px-4 text-center">
                        {item.isExternal ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200">
                            <ExternalLink className="w-3 h-3" />
                            <span>External</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                            <LinkIcon className="w-3 h-3" />
                            <span>Internal</span>
                          </span>
                        )}
                      </td>

                      {/* Visibility Toggle */}
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => onToggleActive(item)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                            item.isActive !== false
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                              : 'bg-slate-100 text-slate-400 border border-slate-200 hover:bg-slate-200'
                          }`}
                        >
                          {item.isActive !== false ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Active</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Hidden</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onOpenEdit(item)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Edit Item"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setItemToDelete(item)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Delete Item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!itemToDelete}
        title="Delete Navigation Item"
        description={`Are you sure you want to delete "${itemToDelete?.label}" from the navigation menu? Visitors will no longer see this link.`}
        confirmText="Delete Link"
        variant="danger"
        onConfirm={() => {
          if (itemToDelete?.id) {
            onDelete(itemToDelete.id);
          }
          setItemToDelete(null);
        }}
        onClose={() => setItemToDelete(null)}
      />
    </div>
  );
};
