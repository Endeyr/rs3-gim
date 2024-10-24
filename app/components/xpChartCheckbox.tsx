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
import { ScrollArea } from '@/components/ui/scroll-area';
import { runemetrics } from '@/lib/const';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';
import { useEffect, useState } from 'react';

type Checked = DropdownMenuCheckboxItemProps['checked'];

interface SkillCheckedI {
  [key: string]: Checked;
}

const XpChartCheckbox = ({
  setSelectedSkills,
}: {
  setSelectedSkills: (skills: string[]) => void;
}) => {
  const [checkedSkills, setCheckedSkills] = useState<SkillCheckedI>({});
  const [allChecked, setAllChecked] = useState(false);
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

  const handleToggleAllChecked = (isChecked: Checked) => {
    const updatedCheckedSkills = skillNames.reduce((acc, skill) => {
      acc[skill] = isChecked;
      return acc;
    }, {} as SkillCheckedI);

    setCheckedSkills(updatedCheckedSkills);
    setSelectedSkills(
      Object.keys(updatedCheckedSkills).filter(
        (skill) => updatedCheckedSkills[skill]
      )
    );
    setAllChecked(!isChecked);
  };

  useEffect(() => {
    const allSkillsChecked = skillNames.every((skill) => checkedSkills[skill]);
    setAllChecked(allSkillsChecked);
  }, [checkedSkills, skillNames]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>Select Skills</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <ScrollArea className='h-[50dvh] min-h-[20dvh] w-full rounded-md border'>
          <DropdownMenuLabel>Skill</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={allChecked}
            onCheckedChange={(checked) => handleToggleAllChecked(checked)}
            onSelect={(e) => e.preventDefault()}
          >
            All
          </DropdownMenuCheckboxItem>
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
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default XpChartCheckbox;
