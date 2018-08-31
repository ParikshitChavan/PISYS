

import { Education } from './education';
import { Project } from './project';
import { Experience } from './experience';
import { Certification } from './certification';

export class CvBuilder {
    user: string;
    address?: string;
    skypeId?: string;
    skills?: {
        techSkills?: [{
            name: string
        }];
        otherStrengths?: [{
            name: string
        }];
        languageSkills?: [{
            name: string
        }]
    };
    educations?: Education[];
    projects?: Project[];
    experience?: Experience[];
    certifications?: Certification[];
    personalInterest?: {
        hobbies?: string;
        motivation?: string
    };
    remarks?: string
}