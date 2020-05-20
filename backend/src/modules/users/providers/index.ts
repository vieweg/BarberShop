import { container } from 'tsyringe';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import BCriptHashProvider from '@modules/users/providers/HashProvider/implementations/BCriptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCriptHashProvider);
