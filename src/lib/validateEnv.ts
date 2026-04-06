import firebaseConfig from '../../firebase-applet-config.json';

export function validateEnv() {
  const requiredKeys = [
    'apiKey',
    'authDomain',
    'projectId',
    'appId'
  ];

  const missing = requiredKeys.filter(
    (key) => !(firebaseConfig as any)[key] || (firebaseConfig as any)[key].includes('TODO')
  );

  if (missing.length > 0) {
    console.error(
      `Firebase configuration is incomplete. Missing or placeholder values for: ${missing.join(', ')}`
    );
  }
}
