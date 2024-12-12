import { compose } from '@hapipal/haute-couture';
import { Server, Plugin } from '@hapi/hapi';

const Composer: Plugin<unknown> = {
  name: process.env.SERVICE_NAME || 'origami',
  register: async (server: Server, options: unknown): Promise<void> => {
    // Custom plugin code can go here
    await compose<unknown>(server, options);
  },
};

export default Composer;
