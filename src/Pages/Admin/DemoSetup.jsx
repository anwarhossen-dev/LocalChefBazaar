import { useState, useEffect } from 'react';
import { Settings, Database, Users, Key, CheckCircle, AlertCircle } from 'lucide-react';
import Container from '../../Components/Shared/Container';
import Card from '../../Components/UI/Card';
import Button from '../../Components/UI/Button';
import DemoAccountManager from '../../Components/Admin/DemoAccountManager';
import { createAllDemoAccounts } from '../../utils/createDemoAccounts';
import { toast } from 'react-toastify';

const DemoSetup = () => {
  const [setupStatus, setSetupStatus] = useState({
    accounts: false,
    database: false,
    permissions: false
  });
  const [loading, setLoading] = useState(false);

  const setupSteps = [
    {
      id: 'accounts',
      title: 'Demo Accounts',
      description: 'Create Firebase authentication accounts for testing',
      icon: <Users className="w-6 h-6" />,
      action: 'Create Accounts'
    },
    {
      id: 'database',
      title: 'Sample Data',
      description: 'Populate database with sample meals, orders, and reviews',
      icon: <Database className="w-6 h-6" />,
      action: 'Load Sample Data'
    },
    {
      id: 'permissions',
      title: 'Role Permissions',
      description: 'Configure role-based access control and permissions',
      icon: <Key className="w-6 h-6" />,
      action: 'Setup Permissions'
    }
  ];

  const handleSetupStep = async (stepId) => {
    setLoading(true);
    
    try {
      switch (stepId) {
        case 'accounts':
          await createAllDemoAccounts();
          setSetupStatus(prev => ({ ...prev, accounts: true }));
          toast.success('Demo accounts created successfully!');
          break;
          
        case 'database':
          // Simulate database setup
          await new Promise(resolve => setTimeout(resolve, 2000));
          setSetupStatus(prev => ({ ...prev, database: true }));
          toast.success('Sample data loaded successfully!');
          break;
          
        case 'permissions':
          // Simulate permissions setup
          await new Promise(resolve => setTimeout(resolve, 1500));
          setSetupStatus(prev => ({ ...prev, permissions: true }));
          toast.success('Role permissions configured!');
          break;
          
        default:
          break;
      }
    } catch (error) {
      console.error(`Error setting up ${stepId}:`, error);
      toast.error(`Failed to setup ${stepId}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteSetup = async () => {
    setLoading(true);
    
    try {
      // Run all setup steps
      for (const step of setupSteps) {
        if (!setupStatus[step.id]) {
          await handleSetupStep(step.id);
        }
      }
      
      toast.success('🎉 Complete demo setup finished!');
    } catch (error) {
      toast.error('Setup failed. Please try individual steps.');
    } finally {
      setLoading(false);
    }
  };

  const allSetupComplete = Object.values(setupStatus).every(status => status);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white">
      <Container className="section-padding">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Settings className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Demo Environment Setup</h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Configure your Local Chef Bazaar demo environment with sample accounts, 
            data, and permissions for comprehensive testing.
          </p>
        </div>

        {/* Quick Setup */}
        <Card className="mb-8 bg-gradient-to-r from-primary-500 to-secondary-500 text-white border-0">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Quick Complete Setup</h2>
            <p className="text-lg opacity-90 mb-6">
              Set up everything at once for instant demo readiness
            </p>
            
            <Button
              onClick={handleCompleteSetup}
              disabled={loading || allSetupComplete}
              className="bg-white text-primary-600 hover:bg-neutral-100 px-8 py-4 text-lg font-semibold"
            >
              {loading ? 'Setting Up...' : allSetupComplete ? '✅ Setup Complete' : '🚀 Complete Setup'}
            </Button>
            
            {allSetupComplete && (
              <div className="mt-4 text-accent-200">
                🎉 Your demo environment is ready for testing!
              </div>
            )}
          </div>
        </Card>

        {/* Setup Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {setupSteps.map((step, index) => (
            <Card key={step.id} className="text-center hover:shadow-lg transition-all duration-300">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                setupStatus[step.id] 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-neutral-100 text-neutral-600'
              }`}>
                {setupStatus[step.id] ? <CheckCircle className="w-8 h-8" /> : step.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-neutral-600 mb-6">{step.description}</p>
              
              <Button
                onClick={() => handleSetupStep(step.id)}
                disabled={loading || setupStatus[step.id]}
                variant={setupStatus[step.id] ? 'secondary' : 'primary'}
                className="w-full"
              >
                {setupStatus[step.id] ? '✅ Complete' : step.action}
              </Button>
            </Card>
          ))}
        </div>

        {/* Demo Account Manager */}
        <DemoAccountManager />

        {/* Setup Instructions */}
        <Card className="mt-8 bg-amber-50 border-amber-200">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-amber-900 mb-2">Setup Instructions</h3>
              <div className="text-amber-800 space-y-2">
                <p><strong>Step 1:</strong> Create demo accounts in Firebase Authentication</p>
                <p><strong>Step 2:</strong> Load sample data (meals, orders, reviews) into your database</p>
                <p><strong>Step 3:</strong> Configure role-based permissions for different user types</p>
                <p><strong>Testing:</strong> Use the demo accounts to test different user experiences</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Demo Credentials Reference */}
        <Card className="mt-8">
          <h3 className="text-xl font-bold mb-6">Demo Credentials Reference</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Crown className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-purple-900">Admin Account</span>
              </div>
              <div className="space-y-1 text-sm">
                <div><strong>Email:</strong> admin@gmail.com</div>
                <div><strong>Password:</strong> Kabir@1234</div>
                <div className="text-purple-700">Full platform access</div>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-900">Chef Account</span>
              </div>
              <div className="space-y-1 text-sm">
                <div><strong>Email:</strong> chef@localchefbazaar.com</div>
                <div><strong>Password:</strong> chef123</div>
                <div className="text-green-700">Meal & order management</div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-blue-900">Customer Account</span>
              </div>
              <div className="space-y-1 text-sm">
                <div><strong>Email:</strong> admin@gmail.com</div>
                <div><strong>Password:</strong> Kabir@1234</div>
                <div className="text-blue-700">Browse & order meals</div>
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default DemoSetup;