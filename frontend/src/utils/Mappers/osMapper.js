"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateOSTypeToCloudOptions = translateOSTypeToCloudOptions;
exports.getAllAvailableOSNames = getAllAvailableOSNames;
const osMap = {
    Linux: {
        aws: ['Linux'],
        azure: ['Canonical:UbuntuServer:22_04-lts:latest'],
    },
    Windows: {
        aws: ['Windows_Server-2022-English-Full-Base'],
        azure: ['MicrosoftWindowsServer:WindowsServer:2022-datacenter:latest'],
    },
    Ubuntu: {
        aws: ['ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server'],
        azure: ['Canonical:UbuntuServer:22_04-lts:latest'],
    },
    'Windows Server': {
        aws: ['Windows_Server-2022-English-Full-Base'],
        azure: ['MicrosoftWindowsServer:WindowsServer:2022-datacenter:latest'],
    },
    'Red Hat Enterprise Linux': {
        aws: ['RHEL-9.0.0_HVM-20220727-x86_64-0-Hourly2-GP2'],
        azure: ['RedHat:RHEL:9_0:latest'],
    },
    CentOS: {
        aws: ['CentOS-7-x86_64-GenericCloud'],
        azure: ['OpenLogic:CentOS:7_9:latest'],
    },
    Debian: {
        aws: ['debian-11-amd64-20240116-1235'],
        azure: ['Debian:debian-11:11:latest'],
    },
    'SUSE Linux': {
        aws: ['suse-sles-15-sp4-v20230112-hvm-ssd-x86_64'],
        azure: ['SUSE:SLES:15-sp4:latest'],
    },
    'Amazon Linux': {
        aws: ['amzn2-ami-hvm-2.0.20240131.0-x86_64-gp2'],
        azure: [],
    },
    'Rocky Linux': {
        aws: ['Rocky-8-EC2-Base-8.8-20230517.0.x86_64'],
        azure: ['RockyEnterpriseSoftwareFoundation:RockyLinux:8_8:latest'],
    },
};
function translateOSTypeToCloudOptions(osName, cloud) {
    const entry = Object.entries(osMap).find(([key]) => key.toLowerCase() === osName.toLowerCase());
    return entry?.[1]?.[cloud] ?? [];
}
function getAllAvailableOSNames() {
    return Object.keys(osMap).sort((a, b) => a.localeCompare(b));
}
//# sourceMappingURL=osMapper.js.map