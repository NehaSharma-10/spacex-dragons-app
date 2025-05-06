export interface HeatShield {
  material: string;
  size_meters: number;
  temp_degrees: number;
  dev_partner: string;
}

export interface PayloadMass {
  kg: number;
  lb: number;
}

export interface PayloadVolume {
  cubic_meters: number;
  cubic_feet: number;
}

export interface TrunkCargo {
  solar_array: number;
  unpressurized_cargo: boolean;
}

export interface Trunk {
  trunk_volume: PayloadVolume;
  cargo: TrunkCargo;
}

export interface Dimensions {
  meters: number;
  feet: number;
}

export interface Thrust {
  kN: number;
  lbf: number;
}

export interface Thruster {
  type: string;
  amount: number;
  pods: number;
  fuel_1: string;
  fuel_2: string;
  isp: number;
  thrust: Thrust;
}

export interface Dragon {
  id: string;
  name: string;
  description: string;
  active: boolean;
  flickr_images: string[];
  wikipedia: string;
  crew_capacity: number;
  first_flight: string;
  type: string;
  sidewall_angle_deg: number;
  orbit_duration_yr: number;
  dry_mass_kg: number;
  dry_mass_lb: number;
  heat_shield: HeatShield;
  launch_payload_mass: PayloadMass;
  launch_payload_vol: PayloadVolume;
  return_payload_mass: PayloadMass;
  return_payload_vol: PayloadVolume;
  pressurized_capsule: {
    payload_volume: PayloadVolume;
  };
  trunk: Trunk;
  height_w_trunk: Dimensions;
  diameter: Dimensions;
  thrusters: Thruster[];
}
