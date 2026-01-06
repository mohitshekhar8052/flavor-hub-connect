import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Edit2, Save, X, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.displayName || '',
    email: currentUser?.email || '',
    phone: '',
  });

  const handleSave = () => {
    // TODO: Implement profile update logic
    toast({
      title: 'Success',
      description: 'Profile updated successfully',
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: currentUser?.displayName || '',
      email: currentUser?.email || '',
      phone: '',
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">My Profile</h1>
              <p className="text-muted-foreground">Manage your account information</p>
            </div>
            {!isEditing && (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>

          <div className="grid gap-6">
            {/* Profile Information */}
            <div className="bg-card rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold mb-6">Personal Information</h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center gap-2 mt-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <p>{formData.name || 'Not provided'}</p>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <p>{formData.email}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Email cannot be changed
                  </p>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  ) : (
                    <div className="flex items-center gap-2 mt-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <p>{formData.phone || 'Not provided'}</p>
                    </div>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-3 mt-6">
                  <Button variant="hero" onClick={handleSave} className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={handleCancel} className="flex-1">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>

            {/* Saved Addresses */}
            <div className="bg-card rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Saved Addresses</h2>
                <Button variant="outline" size="sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  Add Address
                </Button>
              </div>

              <div className="text-center py-8 text-muted-foreground">
                <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No saved addresses yet</p>
                <p className="text-sm">Add an address to save time during checkout</p>
              </div>
            </div>

            {/* Account Settings */}
            <div className="bg-card rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold mb-6">Account Settings</h2>
              
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
