import Router from 'express';

import ProvidersController from '../controllers/ProvidersController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

const providerRoutes = Router();

providerRoutes.get('/', providersController.index);

providerRoutes.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index,
);
providerRoutes.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index,
);

export default providerRoutes;
