import React, { useState } from 'react';
import {
  Wrench,
  Search,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Code2,
  Smartphone,
  Cpu,
  Radio,
  Box,
  Palette,
  Cloud,
  ShieldCheck,
  Layers,
  Sparkles,
  Grid,
  List,
} from 'lucide-react';
import { ServiceItem } from '../../../types';
import { ConfirmModal } from '../../../components/common/ConfirmModal';

interface ServicesManagerProps {
  services: ServiceItem[];
  onOpenCreate: () => void;
  onOpenEdit: (service: ServiceItem) => void;
  onDelete: (id: number) => void;
  onToggleActive?: (service: ServiceItem) => void;
}

// Icon helper to render appropriate icon component by string key
export const renderServiceIcon = (iconName: string, className = 'w-5 h-5') => {
  switch (iconName?.toLowerCase()) {
    case 'code2':
    case 'code':
      return <Code2 className={className} />;
    case 'smartphone':
    case 'phone':
    case 'mobile':
      return <Smartphone className={className} />;
    case 'cpu':
    case 'ai':
    case 'brain':
      return <Cpu className={className} />;
    case 'radio':
    case 'iot':
    case 'wifi':
      return <Radio className={className} />;
    case 'box':
    case 'metaverse':
    case 'cube':
      return <Box className={className} />;
    case 'palette':
    case 'design':
    case 'ui':
      return <Palette className={className} />;
    case 'cloud':
    case 'devops':
      return <Cloud className={className} />;
    case 'shieldcheck':
    case 'shield':
    case 'security':
      return <ShieldCheck className={className} />;
    default:
      return <Wrench className={className} />;
  }
};

export const ServicesManager: React.FC<ServicesManagerProps> = ({
  services,
  onOpenCreate,
  onOpenEdit,
  onDelete,
  onToggleActive,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [serviceToDelete, setServiceToDelete] = useState<ServiceItem | null>(null);

  const filteredServices = services
    .filter((s) => {
      const q = searchTerm.toLowerCase();
      return (
        s.title.toLowerCase().includes(q) ||
        (s.tagline && s.tagline.toLowerCase().includes(q)) ||
        s.slug.toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search services by title, tagline, slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20"
          />
        </div>

        {/* View Toggle & Action Buttons */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-slate-900 shadow-2xs font-bold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onOpenCreate}
            className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Service</span>
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredServices.map((service) => (
            <div
              key={service.id || service.slug}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div className="p-5 space-y-3.5">
                {/* Header Badge, Hero Image Thumbnail & Active Switch */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-700 flex items-center justify-center shadow-2xs shrink-0">
                      {renderServiceIcon(service.icon, 'w-5 h-5')}
                    </div>
                    {service.heroImageUrl && (
                      <div className="w-12 h-10 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                        <img
                          src={service.heroImageUrl}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-400 font-semibold">
                      Order: #{service.displayOrder ?? 0}
                    </span>
                    {onToggleActive && (
                      <button
                        onClick={() => onToggleActive(service)}
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border transition-colors cursor-pointer ${
                          service.isActive !== false
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {service.isActive !== false ? 'Active' : 'Draft'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-900 transition-colors">
                    {service.title}
                  </h4>
                  {service.tagline && (
                    <p className="text-[11px] font-medium text-amber-800/90 mt-0.5 line-clamp-1">
                      {service.tagline}
                    </p>
                  )}
                </div>

                {/* Short Description */}
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {service.shortDescription}
                </p>

                {/* Deliverables Pills */}
                {service.deliverables && service.deliverables.length > 0 && (
                  <div className="pt-1 flex flex-wrap gap-1.5">
                    {service.deliverables.slice(0, 3).map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-50 border border-slate-200 text-slate-600 truncate max-w-[140px]"
                      >
                        {item}
                      </span>
                    ))}
                    {service.deliverables.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-500">
                        +{service.deliverables.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="px-5 py-3 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">/{service.slug}</span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onOpenEdit(service)}
                    className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 shadow-2xs transition-colors cursor-pointer"
                    title="Edit Service"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  {service.id && (
                    <button
                      onClick={() => setServiceToDelete(service)}
                      className="p-1.5 rounded-lg bg-white hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-200 hover:border-red-200 shadow-2xs transition-colors cursor-pointer"
                      title="Delete Service"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-4">Order</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Tagline / Scope</th>
                  <th className="py-3 px-4">Key Deliverables</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredServices.map((service) => (
                  <tr key={service.id || service.slug} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-slate-500 font-bold">
                      #{service.displayOrder ?? 0}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center justify-center shrink-0">
                          {renderServiceIcon(service.icon, 'w-4 h-4')}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{service.title}</p>
                          <span className="text-[10px] text-slate-400 font-mono">/{service.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate">
                      {service.tagline || service.shortDescription}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {(service.deliverables || []).slice(0, 2).map((deliv, i) => (
                          <span
                            key={i}
                            className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] truncate max-w-[120px]"
                          >
                            {deliv}
                          </span>
                        ))}
                        {(service.deliverables || []).length > 2 && (
                          <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-400 text-[10px]">
                            +{(service.deliverables || []).length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      {onToggleActive && (
                        <button
                          onClick={() => onToggleActive(service)}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border transition-colors cursor-pointer ${
                            service.isActive !== false
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-slate-100 text-slate-500 border-slate-200'
                          }`}
                        >
                          {service.isActive !== false ? 'Active' : 'Draft'}
                        </button>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onOpenEdit(service)}
                          className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors cursor-pointer"
                          title="Edit Service"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        {service.id && (
                          <button
                            onClick={() => setServiceToDelete(service)}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors cursor-pointer"
                            title="Delete Service"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={!!serviceToDelete}
        onClose={() => setServiceToDelete(null)}
        onConfirm={() => {
          if (serviceToDelete?.id) {
            onDelete(serviceToDelete.id);
            setServiceToDelete(null);
          }
        }}
        title="Delete Enterprise Service?"
        description={`Are you sure you want to remove "${serviceToDelete?.title}"? It will no longer appear across the public services pages.`}
        confirmText="Delete Service"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
};
