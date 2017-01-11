
import './lib/helpers/helperFunctions.js';
import './lib/helpers/templateHelpers.js';

import './stylesheets/main.less';

import './templates/components/nameStatus.html';
import './templates/components/nameStatus.js';
import './templates/components/bid.html';
import './templates/components/bid.js';
import './templates/components/bidPassword.html';
import './templates/components/bidPassword.js';

import './templates/status/open.html';
import './templates/status/open.js';
import './templates/status/auction.html';
import './templates/status/auction.js';
import './templates/status/owned.html';
import './templates/status/owned.js';
import './templates/status/finalize-button.js';

import './templates/layout/body.html';
import './templates/layout/body.js';
import './templates/layout/header.html';
import './templates/layout/header.js';
import './templates/layout/main.html';
import './templates/layout/notFound.html';
import './templates/layout/router.html';
import './templates/layout/router.js';

import './templates/views/bids.html';
import './templates/views/bids.js';

import './templates/modals/generatePassword.html';
import './templates/modals/generatePassword.js';

import './templates/index.html';

import './collections';
import './meta.js';
import './index.js';

import bids from '/imports/lib/bids';

if (!bids.getPassword()) {
  bids.generatePassword();
}

