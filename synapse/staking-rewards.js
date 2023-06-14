const fetch = require("node-fetch");

class StakingRewards {
  static displayName = "Staking rewards";
  static description = "Get notified when my staking rewards is above a threshold";

  // runs when class is initialized
  async onInit(args) {
    this.StakingRewardsContract = new args.web3.eth.Contract();
  }

  // runs right before user subscribes to new notifications and populates subscription form
  async onSubscribeForm(args) {
    return [
      {
        type: "input-number",
        id: "threshold",
        label: "Staking reward Threshold",
        default: 0,
        description: "Notify me when the staking rewards is above this value in USD",
      },
    ];
  }

  // runs when endpoint's chain is extended - notification scanning happens here
  async onBlocks(args) {
    const threshold = args.subscription["threshold"];

    const StakingReward = 10;

    if (StakingReward > threshold) {
      return {
        notification: `Your staking rewards is ${StakingReward}`,
      };
    }
    return [];
  }
}

module.exports = StakingRewards;
