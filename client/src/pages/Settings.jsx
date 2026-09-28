import { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useToast } from '../context/ToastContext';
import './Settings.css';

export default function Settings() {
  const [apiUrl, setApiUrl] = useState('http://localhost:9000');
  const toast = useToast();

  const handleSave = () => {
    toast({ variant: 'info', message: 'Settings will be persisted in Phase 1.' });
  };

  return (
    <div className="settings">
      <div className="settings__header">
        <h2 className="settings__title">Settings</h2>
        <p className="settings__subtitle">Manage your preferences and configurations.</p>
      </div>

      {/* Appearance */}
      <section className="settings__section" aria-labelledby="settings-appearance">
        <h3 id="settings-appearance" className="settings__section-title">Appearance</h3>
        <Card padding="md" className="settings__card" variant="navy">
          <div className="settings__row">
            <div>
              <div className="settings__row-label">Theme</div>
              <div className="settings__row-desc">Choose your preferred theme.</div>
            </div>
            <div className="settings__radio-group" role="radiogroup" aria-label="Theme selection">
              {['Dark', 'Light', 'System'].map((t) => (
                <label key={t} className={`settings__radio${t === 'Dark' ? ' settings__radio--active' : ' settings__radio--disabled'}`}>
                  <input
                    type="radio"
                    name="theme"
                    value={t.toLowerCase()}
                    defaultChecked={t === 'Dark'}
                    disabled={t !== 'Dark'}
                    className="sr-only"
                  />
                  {t}
                  {t !== 'Dark' && <span className="settings__coming-soon">soon</span>}
                </label>
              ))}
            </div>
          </div>
        </Card>
      </section>

      {/* Application */}
      <section className="settings__section" aria-labelledby="settings-application">
        <h3 id="settings-application" className="settings__section-title">Application</h3>
        <Card padding="md" className="settings__card" variant="navy">
          <div className="settings__field-row">
            <Input
              label="API URL"
              id="api-url-input"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              hint="Backend server endpoint — will be connected in Phase 1."
            />
            <Button
              variant="secondary"
              size="md"
              onClick={handleSave}
              style={{ marginTop: '22px', flexShrink: 0 }}
            >
              Save
            </Button>
          </div>
        </Card>
      </section>

      {/* About */}
      <section className="settings__section" aria-labelledby="settings-about">
        <h3 id="settings-about" className="settings__section-title">About</h3>
        <Card padding="md" className="settings__card settings__about-card" variant="navy">
          <div className="settings__about-logo" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" stroke="var(--color-soft-gold)" strokeWidth="1.5"/>
              <circle cx="16" cy="16" r="6" fill="var(--color-soft-gold)" opacity="0.15"/>
              <circle cx="16" cy="16" r="3" fill="var(--color-soft-gold)"/>
              <path d="M16 2v4M16 26v4M2 16h4M26 16h4" stroke="var(--color-soft-gold)" strokeWidth="1.2" opacity="0.5"/>
            </svg>
          </div>
          <div>
            <div className="settings__about-name">Project Brain</div>
            <div className="settings__about-tagline">Codebase Intelligence Platform</div>
            <div className="settings__about-version">Version 0.1.0 — Stage 0: UI/Environment Ready</div>
          </div>
        </Card>
      </section>
    </div>
  );
}
