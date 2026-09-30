import React, { useState } from 'react';
import {
  Menu,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  GripVertical,
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
  onReorder?: (items: NavItem[]) => void;
  onMoveOrder?: (item: NavItem, direction: 'up' | 'down') => void;
}

export const NavItemsManager: React.FC<NavItemsManagerProps> = ({
  navItems,
  onOpenCreate,
  onOpenEdit,
  onDelete,
  onToggleActive,
  onReorder,
  onMoveOrder,
}) => {
  const [itemToDelete, setItemToDelete] = useState<NavItem | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const sortedItems = [...navItems].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    // Transparent or native ghost preview
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLTableRowElement>, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const reordered = [...sortedItems];
    const [movedItem] = reordered.splice(draggedIndex, 1);
    reordered.splice(targetIndex, 0, movedItem);

    // Reassign sequence 1..N
    const updatedWithOrder = reordered.map((item, idx) => ({
      ...item,
      displayOrder: idx + 1,
    }));

    setDraggedIndex(null);
    setDragOverIndex(null);

    if (onReorder) {
      onReorder(updatedWithOrder);
    }
  };

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
            Drag and drop rows using the grip handle to reorder menu items, or toggle visibility and targets for both Desktop & Mobile navigation.
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
          <table className="w-full text-left border-collapse select-none">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4 w-14 text-center"></th>
                <th className="py-3 px-4 w-16 text-center">Order</th>
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
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No navigation items found. Click "Add Menu Item" above to add one.
                  </td>
                </tr>
              ) : (
                sortedItems.map((item, index) => {
                  const isDragging = draggedIndex === index;
                  const isOver = dragOverIndex === index && draggedIndex !== index;

                  return (
                    <tr
                      key={item.id || item.label}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragEnd={handleDragEnd}
                      onDrop={(e) => handleDrop(e, index)}
                      className={`transition-all duration-200 group ${
                        isDragging
                          ? 'opacity-40 bg-amber-50/50 scale-[0.99] border-dashed border-2 border-amber-400'
                          : isOver
                          ? 'bg-amber-50/70 border-t-2 border-amber-500 shadow-sm'
                          : 'hover:bg-slate-50/80'
                      }`}
                    >
                      {/* Tactile Drag Handle */}
                      <td className="py-3 px-3 text-center cursor-grab active:cursor-grabbing w-14">
                        <div
                          className="inline-flex items-center justify-center p-1.5 rounded-lg text-slate-300 group-hover:text-amber-600 hover:bg-amber-100/60 transition-colors"
                          title="Drag to reorder"
                        >
                          <GripVertical className="w-4 h-4" />
                        </div>
                      </td>

                      {/* Sequence Number */}
                      <td className="py-3 px-4 text-center w-16">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-xs">
                          {item.displayOrder || index + 1}
                        </span>
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
