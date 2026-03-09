import Map "mo:core/Map";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
    // Additional fields can be added here
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getOrganizationName() : async Text {
    "B2B Travel Portal";
  };

  // All authentication and profile management functions are inherited from the authorization component.
};
