import { container } from 'tsyringe';

import IStorageProvider from '@shared/containers/providers/models/IStorageProvider';
import DiskStorageProvider from '@shared/containers/providers/implementations/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
