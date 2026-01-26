import { Clock, CheckCircle, XCircle, FileText } from 'lucide-react';

interface AdminStatsProps {
  pending: number;
  approved: number;
  rejected: number;
  total: number;
}

export function AdminStats({ pending, approved, rejected, total }: AdminStatsProps) {
  const stats = [
    { 
      label: 'Totaal', 
      value: total, 
      icon: FileText, 
      color: 'bg-muted text-foreground' 
    },
    { 
      label: 'Wachtend', 
      value: pending, 
      icon: Clock, 
      color: 'bg-yellow-100 text-yellow-800' 
    },
    { 
      label: 'Goedgekeurd', 
      value: approved, 
      icon: CheckCircle, 
      color: 'bg-green-100 text-green-800' 
    },
    { 
      label: 'Afgewezen', 
      value: rejected, 
      icon: XCircle, 
      color: 'bg-red-100 text-red-800' 
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div 
          key={stat.label}
          className={`rounded-xl p-4 ${stat.color}`}
        >
          <div className="flex items-center gap-3">
            <stat.icon className="w-8 h-8 opacity-80" />
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm opacity-80">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
