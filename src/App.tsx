import { useState } from 'react';
import { PublicNavbar } from './components/common/PublicNavbar';
import { PublicFooter } from './components/common/PublicFooter';
import { Screen9_PortalHome } from './pages/public/Screen9_PortalHome';
import { Screen8_BumdesProfile } from './pages/public/Screen8_BumdesProfile';
import { Screen7_BusinessCatalog } from './pages/public/Screen7_BusinessCatalog';
import { Screen6_Transparency } from './pages/public/Screen6_Transparency';
import { Screen5_NewsGallery } from './pages/public/Screen5_NewsGallery';
import { Screen4_AdminLogin } from './pages/admin/Screen4_AdminLogin';
import { Screen2_AdminDashboard } from './pages/admin/Screen2_AdminDashboard';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('beranda');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  const handleNavigate = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8FF] font-sans antialiased text-slate-800">
      {/* Public Header (only shown if not in internal admin dashboard) */}
      {currentTab !== 'admin-dashboard' && (
        <PublicNavbar
          currentTab={currentTab}
          onNavigate={handleNavigate}
          onOpenPamCheck={() => {
            handleNavigate('beranda');
            setTimeout(() => {
              const el = document.getElementById('layanan');
              el?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'beranda' && (
          <Screen9_PortalHome
            onNavigateToUnit={(unitCode) => {
              if (unitCode === 'KRIYA_GERABAH') {
                handleNavigate('katalog');
              } else {
                handleNavigate('unit-usaha');
              }
            }}
            onNavigateToTransparency={() => handleNavigate('transparansi')}
            onNavigateToNews={() => handleNavigate('warta')}
          />
        )}

        {currentTab === 'unit-usaha' && (
          <Screen8_BumdesProfile
            onNavigateToCatalog={() => handleNavigate('katalog')}
            onNavigateToTransparency={() => handleNavigate('transparansi')}
          />
        )}

        {currentTab === 'katalog' && (
          <Screen7_BusinessCatalog />
        )}

        {currentTab === 'transparansi' && (
          <Screen6_Transparency />
        )}

        {currentTab === 'warta' && (
          <Screen5_NewsGallery />
        )}

        {/* SCREEN_4: Login Admin Internal */}
        {currentTab === 'admin-login' && !isAdminLoggedIn && (
          <Screen4_AdminLogin
            onSuccessLogin={() => {
              setIsAdminLoggedIn(true);
              handleNavigate('admin-dashboard');
            }}
            onBackToPublic={() => handleNavigate('beranda')}
          />
        )}

        {/* SCREEN_2: Admin Dashboard SIMBUMDes */}
        {currentTab === 'admin-dashboard' && (
          <Screen2_AdminDashboard
            onLogout={() => {
              setIsAdminLoggedIn(false);
              handleNavigate('beranda');
            }}
            onViewPublic={() => handleNavigate('beranda')}
          />
        )}
      </main>

      {/* Public Footer (only shown if not in admin dashboard) */}
      {currentTab !== 'admin-dashboard' && <PublicFooter />}
    </div>
  );
}

export default App;
