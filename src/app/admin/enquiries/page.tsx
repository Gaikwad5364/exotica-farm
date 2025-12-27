import { prisma } from "@/lib/prisma";
import EnquiryRow from "./EnquiryRow";
import Link from "next/link";

export default async function AdminEnquiries({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
    const params = await searchParams;
    const activeStatus = params.status || 'all';

    const where: any = { type: 'contact' };
    if (activeStatus === 'communicating') {
        where.isContacted = true;
        where.status = 'pending';
    } else if (activeStatus === 'pending') {
        where.status = 'pending';
        where.isContacted = false;
    }

    const enquiries = await prisma.enquiry.findMany({
        where,
        orderBy: { createdAt: 'desc' }
    });

    const totalCount = await prisma.enquiry.count({ where: { type: 'contact' } });
    const pendingCount = await prisma.enquiry.count({ where: { type: 'contact', status: 'pending', isContacted: false } });
    const communicatingCount = await prisma.enquiry.count({ where: { type: 'contact', isContacted: true, status: 'pending' } });

    return (
        <div>
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '2rem', color: '#1a1a1a', marginBottom: '8px' }}>Contact Enquiries</h1>
                <p style={{ color: '#666' }}>Review general messages from the contact form.</p>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
                <StatusTab label="All" status="all" active={activeStatus === 'all'} count={totalCount} />
                <StatusTab label="New" status="pending" active={activeStatus === 'pending'} count={pendingCount} />
                <StatusTab label="Communicating" status="communicating" active={activeStatus === 'communicating'} count={communicatingCount} />
            </div>

            <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #eee', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: '#fafafa', borderBottom: '1px solid #eee' }}>
                        <tr>
                            <th style={thStyle}>Date</th>
                            <th style={thStyle}>Type</th>
                            <th style={thStyle}>Contact</th>
                            <th style={thStyle}>Message / Details</th>
                            <th style={{ ...thStyle, textAlign: 'center' }}>Actions</th>
                            <th style={{ ...thStyle, textAlign: 'right' }}>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enquiries.map((e) => (
                            <EnquiryRow key={e.id} enquiry={e} />
                        ))}
                        {enquiries.length === 0 && (
                            <tr>
                                <td colSpan={6} style={{ padding: '60px', textAlign: 'center' }}>
                                    <div style={{ color: '#999', fontSize: '1.1rem' }}>No {activeStatus} enquiries found.</div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function StatusTab({ label, status, active, count }: { label: string, status: string, active: boolean, count: number }) {
    return (
        <Link
            href={`/admin/enquiries?status=${status}`}
            style={{
                padding: '8px 20px',
                borderRadius: '50px',
                background: active ? 'var(--color-primary)' : 'white',
                color: active ? 'white' : '#666',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 600,
                border: '1px solid',
                borderColor: active ? 'var(--color-primary)' : '#eee',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s'
            }}
        >
            {label}
            <span style={{
                background: active ? 'rgba(255,255,255,0.2)' : '#f0f0f0',
                padding: '1px 8px',
                borderRadius: '10px',
                fontSize: '0.75rem'
            }}>{count}</span>
        </Link>
    );
}

const thStyle = { padding: '16px 24px', fontSize: '0.85rem', fontWeight: 600, color: '#666' };
