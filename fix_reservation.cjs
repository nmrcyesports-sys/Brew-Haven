const fs = require('fs');
let code = fs.readFileSync('src/pages/Reservation.tsx', 'utf8');

const replacement = `
  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get form data
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const clientName = formData.get('name') as string;
    const clientEmail = formData.get('email') as string;
    const clientPhone = formData.get('phone') as string;
    const specialRequests = formData.get('requests') as string;

    // Send email to client
    try {
      await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: clientEmail,
          subject: 'Reservation Confirmed - Brew Haven',
          text: \`Hi \${clientName},\\n\\nYour reservation at Brew Haven is confirmed!\\n\\nDate: \${date}\\nTime: \${time}\\nParty Size: \${guests}\\nTable: \${selectedTable || 'Assigned on arrival'}\\n\\nWe look forward to seeing you.\\n\\nBrew Haven\`
        })
      });
      
      // Send email to Admin
      await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'admin@brewhaven.example',
          subject: 'New Reservation - Brew Haven',
          text: \`New reservation received:\\n\\nName: \${clientName}\\nEmail: \${clientEmail}\\nPhone: \${clientPhone}\\nDate: \${date}\\nTime: \${time}\\nParty Size: \${guests}\\nTable: \${selectedTable || 'None'}\\nRequests: \${specialRequests || 'None'}\`
        })
      });
    } catch (err) {
      console.error("Failed to send booking emails", err);
    }
    
    setBookingComplete(true);
  };`;

code = code.replace(/const handleComplete = \(e: React\.FormEvent\) => \{[\s\S]*?setBookingComplete\(true\);\s*\};/, replacement);

fs.writeFileSync('src/pages/Reservation.tsx', code);
