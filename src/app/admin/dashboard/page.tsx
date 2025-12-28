export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import { MessageSquare, Mail, Calendar, CheckCircle } from "lucide-react";
import StatCard from "./StatCard";

export default async function AdminDashboard() {
    const stats = await prisma.$transaction([
        prisma.testimonial.count(),
        prisma.enquiry.count({ where: { type: 'farm_visit' } }),
        prisma.enquiry.count({ where: { type: 'contact' } }),
    ]);

    const [totalTestimonials, totalFarmVisits, contactEnquiries] = stats;

    return (
        <div>
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2rem', color: '#1a1a1a', marginBottom: '8px' }}>Dashboard Overview</h1>
                <p style={{ color: '#666' }}>Welcome back to the Exotica Farm management console.</p>
            </div>

            <div className="admin-stat-grid">
                <StatCard
                    title="Total Reviews"
                    value={totalTestimonials}
                    icon={<MessageSquare size={24} color="#f59e0b" />}
                    bgColor="#fffbeb"
                    href="/admin/testimonials"
                />
                <StatCard
                    title="Farm Visits"
                    value={totalFarmVisits}
                    icon={<Calendar size={24} color="#3b82f6" />}
                    bgColor="#eff6ff"
                    href="/admin/farm-visits"
                />
                <StatCard
                    title="Enquiries"
                    value={contactEnquiries}
                    icon={<Mail size={24} color="#8b5cf6" />}
                    bgColor="#f5f3ff"
                    href="/admin/enquiries"
                />
            </div>

            <div style={{ marginTop: '60px' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Recent Activity</h2>
                <div style={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: '30px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                    border: '1px solid #eee',
                    textAlign: 'center',
                    color: '#999'
                }}>
                    No recent submissions to display.
                </div>
            </div>
        </div>
    );
}
