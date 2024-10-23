'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { runemetrics } from '@/lib/const';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';

type Checked = DropdownMenuCheckboxItemProps['checked'];

interface SkillCheckedI {
  [key: string]: Checked;
}

const XpChartCheckbox = ({
  setSelectedSkills,
}: {
  setSelectedSkills: (skills: string[]) => void;
}) => {
  const [checkedSkills, setCheckedSkills] = useState<SkillCheckedI>();
  const skillNames = Object.values(runemetrics.skills);
  const handleCheckedChange = (skill: string, isChecked: Checked) => {
    const updatedCheckedSkills = {
      ...checkedSkills,
      [skill]: isChecked,
    };
    setCheckedSkills(updatedCheckedSkills);
    const selectedSkills = Object.keys(updatedCheckedSkills).filter(
      (key) => updatedCheckedSkills[key]
    );
    setSelectedSkills(selectedSkills);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>Select Skills</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Skill</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {skillNames.map((skill) => (
          <DropdownMenuCheckboxItem
            key={skill}
            checked={checkedSkills ? checkedSkills[skill] : false}
            onCheckedChange={(checked) => handleCheckedChange(skill, checked)}
            onSelect={(e) => e.preventDefault()}
          >
            {skill}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default XpChartCheckbox;
