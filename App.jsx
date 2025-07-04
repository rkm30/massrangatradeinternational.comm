import React, { useState } from "react";

export default function App() {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [packages, setPackages] = useState([
    "সৌদি হজ ট্যুর",
    "মালয়েশিয়া ট্যুর",
    "দুবাই ভ্রমণ",
    "থাইল্যান্ড হানিমুন"
  ]);
  const [newPackage, setNewPackage] = useState("");
  const [managingPartner, setManagingPartner] = useState("Managing Partner");
  const [partner, setPartner] = useState("Partner");
  const [contacts, setContacts] = useState([]);

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      setAdminLoggedIn(true);
    } else {
      alert("ভুল ইউজারনেম বা পাসওয়ার্ড");
    }
  };

  const handleAddPackage = () => {
    if (newPackage.trim()) {
      setPackages([...packages, newPackage]);
      setNewPackage("");
    }
  };

  const handleDeletePackage = (index) => {
    setPackages(packages.filter((_, i) => i !== index));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const message = e.target.message.value;
    setContacts([...contacts, { name, message }]);
    e.target.reset();
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6 font-sans">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-blue-700">Massranga Trade International</h1>
        <p className="text-sm">RL-2580 | Contact: 01613035387</p>
        <p className="text-sm">HR & Admin: Md Rashed Khan Milon (Manager)</p>
        <p className="text-sm">Managing Partner: {managingPartner}</p>
        <p className="text-sm">Partner: {partner}</p>
      </header>

      {!adminLoggedIn ? (
        <div className="grid md:grid-cols-3 gap-4">
          {packages.map((pkg, index) => (
            <div key={index} className="border p-4 rounded shadow-sm">
              <h2 className="font-bold text-lg">🌍 {pkg}</h2>
              <p className="text-sm text-gray-600">বিশেষ অফার সহ ভ্রমণ প্যাকেজ</p>
            </div>
          ))}
          <div className="border p-4 rounded">
            <h2 className="font-semibold text-lg">📨 যোগাযোগ</h2>
            <form onSubmit={handleContactSubmit} className="space-y-2">
              <input type="text" name="name" placeholder="নাম" required className="w-full border px-2 py-1 rounded" />
              <textarea name="message" placeholder="বার্তা" required className="w-full border px-2 py-1 rounded" />
              <button type="submit" className="w-full bg-blue-600 text-white py-1 rounded">পাঠান</button>
            </form>
          </div>
          <div className="border p-4 rounded">
            <h2 className="font-semibold text-lg">🔐 Admin Panel</h2>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="w-full mb-2 border px-2 py-1 rounded" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full mb-2 border px-2 py-1 rounded" />
            <button onClick={handleLogin} className="w-full bg-green-600 text-white py-1 rounded">লগইন</button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-green-700">🎉 অ্যাডমিন প্যানেল</h2>
          <div>
            <h3 className="font-semibold">🌍 ট্যুর প্যাকেজ:</h3>
            <ul className="list-disc pl-5">
              {packages.map((pkg, i) => (
                <li key={i} className="flex justify-between">
                  {pkg}
                  <button onClick={() => handleDeletePackage(i)} className="text-red-500">✖</button>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex gap-2">
              <input value={newPackage} onChange={(e) => setNewPackage(e.target.value)} placeholder="নতুন প্যাকেজ" className="border px-2 py-1 rounded w-full" />
              <button onClick={handleAddPackage} className="bg-blue-600 text-white px-3 rounded">➕</button>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">🧑‍💼 পার্টনার তথ্য:</h3>
            <input value={managingPartner} onChange={(e) => setManagingPartner(e.target.value)} placeholder="Managing Partner" className="w-full mb-2 border px-2 py-1 rounded" />
            <input value={partner} onChange={(e) => setPartner(e.target.value)} placeholder="Partner" className="w-full border px-2 py-1 rounded" />
          </div>
          <div>
            <h3 className="font-semibold">📩 কাস্টমার বার্তা:</h3>
            {contacts.length === 0 ? <p className="text-gray-500">কোন বার্তা নেই</p> :
              <ul className="list-disc pl-5">
                {contacts.map((c, i) => <li key={i}><strong>{c.name}</strong>: {c.message}</li>)}
              </ul>}
          </div>
        </div>
      )}
    </div>
  );
}
