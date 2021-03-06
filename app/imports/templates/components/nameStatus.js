import { registrar } from '/imports/lib/ethereum';

Template['components_nameStatus'].onCreated(function() {
  var template = this;
  TemplateVar.set('error', false);
  function lookupName(name) {
    if (!name) {
      return;
    }
    try {
      registrar.getEntry(name, (err, entry) => {
        if(!err && entry) {
          TemplateVar.set(template, 'nameInfo', {
            name: entry.name + '.eth',
            entry
          })

          TemplateVar.set(template, 'name', entry.name);
          TemplateVar.set(template, 'status', 'status-' + entry.mode);
          TemplateVar.set(template, 'aside', 'aside-' + entry.mode);
          Session.set('name', entry.name);
        }
      });
    } catch(e) {
      TemplateVar.set(template, 'error', e);
    }
  }
  
  this.autorun(function() {
    var searched = Session.get('searched');
    TemplateVar.set(template, 'error', false);
      //Look up name on 'searched' change.
    lookupName(searched);
  })
  
  setInterval(() => lookupName(Session.get('searched')), 1000);
});


Template['components_nameStatus'].helpers({
    searched() {
      return Session.get('searched');
    },
    fullName() {
      //searched + .eth
      return TemplateVar.get('nameInfo').name
    }
});

Template['aside-forbidden-can-invalidate'].helpers({
  value() {
    var val = Template.instance().data.entry.deed.balance;
    return web3.fromWei(val ? val.toFixed() : 0, 'ether');
  },
  invalidatorFee() {
    var val = Template.instance().data.entry.deed.balance;
    return web3.fromWei(val ? val.toFixed()/2 : 0, 'ether');
  }
})


Template['status-finalize'].helpers({
  owner() {
    return Template.instance().data.entry.deed.owner();
  },
  refund() {
    var deed = Template.instance().data.entry.deed.balance;
    var value = Template.instance().data.value || 10000000000000000;
    return web3.fromWei( deed.minus(value).toFixed(), 'ether');
  },
  registrationDate() {
    var date = new Date(Template.instance().data.entry.registrationDate * 1000);
    return date.toLocaleString();
  },
  renewalDate() {
    var years = 365 * 24 * 60 * 60 * 1000;
    var date = new Date(Template.instance().data.entry.registrationDate * 1000 + 2 * years);
    return date.toLocaleDateString();
  },
  highestBid() {
    var val = Template.instance().data.entry.highestBid;
    return web3.fromWei(val, 'ether');
  }
})

Template['status-reveal'].helpers({
  bids() {
    const name = Session.get('searched');
    return MyBids.find({name: name});
  },
  hasBids() {
    const name = Session.get('searched');
    return MyBids.find({name: name}).count() > 0 ;
  }  
})


Template['aside-reveal'].helpers({ 
  registrationDate() {
    var m = moment(Template.instance().data.entry.registrationDate * 1000);

    return m.format('YYYY-MM-DD HH:mm');
  }, 
  timeRemaining() {
    var m = moment(Template.instance().data.entry.registrationDate * 1000);
    
    return Math.floor(m.diff(moment(), 'minutes')/60) + 'h ' + Math.floor(m.diff(moment(), 'minutes')%60) + 'm ' + Math.floor(m.diff(moment(), 'seconds')%60) + 's';
    
  },
  highestBid() {
    var val = Template.instance().data.entry.highestBid;
    return web3.fromWei(val, 'ether');
  }
})



